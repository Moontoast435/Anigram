from itertools import chain
import json
# from channels.generic.websocket import AsyncWebsocketConsumer
from channels.consumer import AsyncConsumer, SyncConsumer
from channels.exceptions import StopConsumer
from .models import Clients, Chats
from asgiref.sync import async_to_sync, sync_to_async
from channels.layers import get_channel_layer
from datetime import date





class ChatConsumer(SyncConsumer):
    def websocket_connect(self, event):
        print("channel is", self.channel_name)
        print("websocket is connected...", event)
        self.send({
            'type' : 'websocket.accept',
        })

    def websocket_receive(self, event):
        print("Message received from client...", event)
        json_event = json.loads(event['text'])
        action = json_event['type']
        if action == "online":
            Clients.objects.create(channel_name = self.channel_name, username = json_event["username"])
            self.send({
            'type': 'websocket.send',
            'text': json.dumps({"message" : "Hey, you're now online"}),
        })
        elif action == "sendMsg":
            # channel_layer = get_channel_layer()
            try:
                user_to_send = list(Clients.objects.filter(username = json_event["recipient"]))[0]
                async_to_sync(self.channel_layer.send)(user_to_send.channel_name, {
                    "type" : "message.receive",
                    "text" : json_event["message"]
                })
            except:
                print("that user is not online")
            finally:
                currentUser = list(Clients.objects.filter(channel_name = self.channel_name))[0]
                today = date.today()
                Chats.objects.create(sender = currentUser.username, recipient =json_event["recipient"], message = json_event["message"], date = today )
                self.send({
                    'type': 'websocket.send',
                    'text': json.dumps({"message" :"Message has been sent"})
                })
        elif action == "getList":
            currentUser = list(Clients.objects.filter(channel_name = self.channel_name))[0].username
            convos_1 = Chats.objects.filter(recipient=currentUser).values_list('sender').distinct()
            convos_2 = Chats.objects.filter(sender=currentUser).values_list('recipient').distinct()
            convos = set(chain(convos_1, convos_2))
            to_send = {"type" : "set_list", "data" : list(convos)}
            self.send({
                'type' : 'websocket.send',
                'text' : json.dumps(to_send)
            })
    
    def websocket_disconnect(self, event):
        print('Websocket Disconnected...', event)
        Clients.objects.filter(channel_name=self.channel_name).delete()
        raise StopConsumer()
    
    def message_receive(self, event):
        self.send({
            'type': 'websocket.send',
            'text': json.dumps({"type" :"notification"})
        })

class AsyncChatConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print("channel is", self.channel_name)
        print("websocket is connected...", event)
        await self.send({
            'type' : 'websocket.accept',
        })

    async def websocket_receive(self, event):
        print("Message received from client...", event)
        print(event['text'])
        await self.send({
            'type': 'websocket.send',
            'text': "this is a test yo"
        })
    
    async def websocket_disconnect(self, event):
        print('Websocket Disconnected...', event)
        raise StopConsumer()

from flask import Flask, request, jsonify

from threading import Thread
from discord import DMChannel
from discord.ext import commands
from discord.utils import get as getUser
import asyncio


app = Flask(__name__)
client = commands.Bot(command_prefix="!")
TOKEN = 'NzIxNDA4NjI0MDA5Njc0NzUy.XuWZ5g.nvMU_D_7Hygc7ereg02GyWLM1Hg'

def run():
    """ Runs server"""
    app.run()

thread = Thread(target = run)
thread.start()

mems = []
stat = {}
guild = None

@client.event
async def on_ready():
    print("I'm in")
    print(client.user)
    #Get initial status
    guild = client.get_guild(721408899194028072)
    memList = guild.members
    for member in memList:
        stat[member.name + "#" + member.discriminator] = member.status[0]
    
    
@client.event
async def on_message(message):
    if message.channel.id == 737946149708890133:
        parseMes = message.content.split(";")
        senderTag = parseMes[0].split("#")
        checkId = getUser(client.get_all_members(),
            name=senderTag[0], discriminator=senderTag[1])
        if (checkId != None):
            await sendDM(parseMes[0], parseMes[1], parseMes[2])

@client.event
async def on_member_update(before, after):
    print(after.name + after.status[0])
    stat[after.name + "#" + after.discriminator] = after.status[0]

#@client.command(name='sendDM',pass_context=True)
async def sendDM(sender, mes, recipient):
    tag = recipient.split("#")
    user = getUser(client.get_all_members(),
        name=tag[0], discriminator=tag[1])
    message = sender + " is requesting help with: " + mes
    if(user.status[0] == 'online'):
        await DMChannel.send(user, message)

#########

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/mentorRequest', methods=['GET'])
def confirmMentorRequest():
    tag = request.args.get('name')
    disc = request.args.get('disc')
    user = getUser(client.get_all_members(),
        name=tag, discriminator=disc)
    confirmation = ""
    if(user == None):
        confirmation = "Sorry, your request failed, please re-enter your discord handle."
    elif(user.status[0] != 'online'):
        confirmation = "Sorry, the mentor has gone offline"
    else: 
        confirmation = "Your request was successful, please wait for a response from the mentor."    
    return jsonify({"conf": confirmation})

@app.route('/getStatus', methods=['GET'])
def getStatus():
    return jsonify(stat)




if __name__ == '__main__':
    client.run(TOKEN)
    



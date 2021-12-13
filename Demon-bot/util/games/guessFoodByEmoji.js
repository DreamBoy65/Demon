const { MessageEmbed } = require("discord.js")
const foodArray = require("../../database/json/foodemoji.json")
let playing = []

class guessFoodByEmoji {
  constructor (options){
    if(!options.message) throw new TypeError("Message is not provided. ")


    this.message = options.message
    this.winMessage = options.winMessage ? options.winMessage : "WoW! You won."
    this.loseMessage = options.loseMessage ? options.loseMessage : "Oops! You Lose."
   this.tries = options.tries ? options.tries : 5
    this.embedColor = options.embedColor ? options.embedColor : "RANDOM"
    this.embedTitle = options.embedTitle ? options.embedTitle : "Guess The Food By Emoji Game!"
    this.timeOut = options.timeOut ? options.timeOut : 60000
   this.WrongAnswerMessage =  options.WrongAnswerMessage ? options.WrongAnswerMessage : "Oops ! thats wrong!"
  }

  async start(){

      if(playing.includes(this.message.author.id)) {
        return this.message.channel.send("You Are already in a game!")
      }
    
    this.food = foodArray[Math.floor(Math.random() * foodArray.length)]

    const embed = new MessageEmbed()
    .setTitle(this.embedTitle)  
    .setDescription(`Guess: ${this.food.emojis.join(" + ")}`)
    .setColor(this.embedColor)
    .setTimestamp()


    let msg = await this.message.channel.send({embeds: [embed]})

    const filter = (m) => m.author.id === this.message.author.id

    let collector = this.message.channel.createMessageCollector({filter, time: this.timeOut})

    playing.push(this.message.author.id)

    this.lose = 0

    collector.on("collect", async(m) => {
      let content = m.content

      if(content.toLowerCase()== "stop"){
        collector.stop()
          return this.message.channel.send("Stopped the game!")
      }

      if(this.lose >= this.tries){
        collector.stop()
          
        embed.setDescription(`The Answer is ${this.food.name}`)
        msg.edit({embeds: [embed]})
        return this.message.channel.send(this.loseMessage)
      }

      if(content.toLowerCase()== this.food.name.toLowerCase()){
        collector.stop()   
          return this.message.channel.send(this.winMessage)
      } else {
        this.lose = this.lose + 1
        return this.message.channel.send(this.WrongAnswerMessage)
      }
    })

    collector.on("end", () => {
      playing = playing.filter(m => m !== this.message.author.id)
    })
  }
}

module.exports = guessFoodByEmoji;
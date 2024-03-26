#!/usr/bin/env node


import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation"
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// console.log(chalk.bgGreen("hi mom"))


let playerName;

const sleep=(ms=2000)=> new Promise((r)=> setTimeout(r, ms))


async function welcome(){
    const rainbowTitle=chalkAnimation.rainbow("lets introduce the nodejs cli")
    await sleep()
    rainbowTitle.stop()

    console.log(`
        ${chalk.bgBlue("How TO PLAY")}
        Process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')},
        So all the questions correct!!
    `)
}

await welcome()

// inquirer is used to get user input in the terminal:-
async function  askName(){
    const answers=await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name!',
        default(){
            return "Player"
        }
    });
    playerName=answers.player_name
}

await askName()


async function question1(){
    const answers=await inquirer.prompt({
        name:'question_1',
        type: "list",
        message: 'Javascript was created by:-\n',
        choices:[
            'Sergey brin',
            'Larry page',
            'Brandon eich',
            'elon musk'
        ]
    });
    return handleAnswer(answers.question_1 == 'Brandon eich')
}
async function question2(){
    const answers=await inquirer.prompt({
        name:'question_2',
        type: "list",
        message: 'npm was created by:-\n',
        choices:[
            'Isaac Z. Schlueter ',
            'ryan dahl',
            'Kara swissher',
            'robert scoble'
        ]
    });
    return handleAnswer(answers.question_2 == 'Isaac Z. Schlueter ')
}

async function handleAnswer(isCorrect){
    const spinner =createSpinner('Checking answer!!!').start()
    await sleep()
    if(isCorrect){
        spinner.success({
            text: `Nice work!!! ${playerName}`
        })
    }
    else{
        spinner.error({text: `💀💀💀💀Game gotcha over!! and you losed`})
        process.exit(1)
    }
}

await question1()
await question2()


function winner(){
    console.clear();
    const msg=`Congratulations, ${playerName} !\n`;

    figlet(msg, (err, data)=>{
        console.log(gradient.pastel.multiline(data))
    })
}

await winner()
/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function restartQuiz()
{
    const opaqueBoxes = document.querySelectorAll('.opacity');
    for(const box of opaqueBoxes)
        box.classList.remove('opacity');

    const newBackgroundBoxes = document.querySelectorAll('.new-background');
    for(const box of newBackgroundBoxes)
        box.classList.remove('new-background');

    const chechedBoxes = document.querySelectorAll('.checkbox');
    for(const box of chechedBoxes)
        box.src="images/unchecked.png";

    const hiddenBoxes = document.querySelector('div.configuration');
        hiddenBoxes.classList.add('hidden');

    choices = [];
    count = 0;
    lastClicked = undefined;
    questionList = ['one', 'two', 'three'];
    button.removeEventListener('click', restartQuiz);
}

function mostFrequentChoice()
{
    let mostChoice;
    let max = 0;
    for(const box of choices)
    {
        let actual_max = 0;

        for(const c of choices)
        {
            if(c.dataset.choiceId === box.dataset.choiceId)
                actual_max++;

            if(actual_max > max)
            {
                max = actual_max;
                mostChoice = c;
            }
        }
    }

    return mostChoice;
}

function showAnswer()
{
    const answer = document.querySelector('.configuration, .hidden');
    answer.classList.remove('hidden');

    let box = mostFrequentChoice();
    let result = RESULTS_MAP[box.dataset.choiceId];

    document.getElementById('resize').textContent = result.title;
    document.getElementById('paragraph').textContent = result.contents;

    const button = document.getElementById('button');
    button.addEventListener('click', restartQuiz);
}

function isTestFinished(container)
{
    for(const q of questionList)
    {
        if(container.dataset.questionId === q && container.classList.contains('new-background'))
        {
            questionList.splice(questionList.indexOf(q), 1);
            count++;
        }
    }

    if(count === 3)
        showAnswer();
}

function pushElement(container)
{
    for(const box of choices)
    {
        if(container.dataset.questionId === box.dataset.questionId)
            choices.splice(choices.indexOf(box), 1);
    }

    choices.push(container);
}

function unchecked(container)
{
    const image = container.querySelector('.checkbox');
    image.src = "images/unchecked.png";
    container.classList.remove('new-background');
    container.classList.add('opacity');
    container.addEventListener('click', checked);
}

function checked(event)
{
    const container = event.currentTarget;
    const choiceId = container.dataset.choiceId;
    const questionId = container.dataset.questionId;    

    if(count !== 3)
    {
        if(choiceId !== lastClicked)
        {
            const image = container.querySelector('.checkbox');
            image.src = "images/checked.png";
            container.classList.add('new-background');

            for(const j of boxes)
            {
                let qId = j.dataset.questionId;
                let cId = j.dataset.choiceId;

                if(qId === questionId)
                {
                    if(cId !== choiceId)
                        unchecked(j);
                    else
                        j.classList.remove('opacity');
                }
            }

            container.removeEventListener('click', checked)

            isTestFinished(container);
            pushElement(container);
        }
    }

    lastClicked = container;
}   

let choices = [];
let count = 0;
let lastClicked;
let questionList = ['one', 'two', 'three'];

const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes)
{
    box.addEventListener('click', checked);
}
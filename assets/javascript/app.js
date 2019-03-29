const config = {
    apiKey: "AIzaSyBj6fj9PkkibdkZoxsShjOibmKNPI7xgJU",
    authDomain: "train-schedule-b5bb0.firebaseapp.com",
    databaseURL: "https://train-schedule-b5bb0.firebaseio.com",
    projectId: "train-schedule-b5bb0",
    storageBucket: "",
    messagingSenderId: "431470405365"
}

firebase.initializeApp(config);

let db = firebase.firestore(),
    id = db.collection('TrainSchedule').doc().id

const init = () => {
    document.querySelector('.addtrain').style.visibility = 'hidden'
    document.querySelector('.addbtn').addEventListener('click', e => {
        document.querySelector('.addtrain').style.visibility = ''
    })
}

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    if (document.querySelector('#duration').value > 0){
        db.collection('TrainSchedule').doc(id).set({
            destination: document.querySelector('#destination').value,
            firsttrain: document.querySelector('#first-train').value,
            duration: document.querySelector('#duration').value,
        })
        document.querySelector('#destination').value = ''
        document.querySelector('#first-train').value = ''
        document.querySelector('#duration').value = ''
        document.querySelector('.addtrain').style.visibility = 'hidden'
    }
})

db.collection('TrainSchedule').onSnapshot(({docs}) =>{
    document.querySelector('.traininfo').innerHTML = ''
    docs.forEach(doc => {
        let {destination, firsttrain, duration} = doc.data()
        let traininfo = document.createElement('div')
        traininfo.innerHTML = `
        <div class="col s4 info">${destination}</div>
        <div class="col s3 info">${duration}</div>
        <div class="col s3 info">${firsttrain}</div>
        <div class="col s2 info">${duration}</div>
        `

        document.querySelector('.traininfo').append(traininfo)
    })
})

init()
const config = {
    apiKey: "AIzaSyBj6fj9PkkibdkZoxsShjOibmKNPI7xgJU",
    authDomain: "train-schedule-b5bb0.firebaseapp.com",
    databaseURL: "https://train-schedule-b5bb0.firebaseio.com",
    projectId: "train-schedule-b5bb0",
    storageBucket: "",
    messagingSenderId: "431470405365"
}

firebase.initializeApp(config);

let db = firebase.firestore()

const init = () => {
    document.querySelector('.addtrain').style.visibility = 'hidden'
    document.querySelector('.addbtn').addEventListener('click', () => {
        document.querySelector('.addtrain').style.visibility = ''
    })
}

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    let duration = document.querySelector('#duration').value,
        firsttrain = document.querySelector('#first-train').value,
        time = moment(`${firsttrain}`,'HH:mm').valueOf(),
        durInUnix = 60000 * parseInt(duration),
        ETA = time += durInUnix,
        minaway = (ETA - moment())/60000
    if (document.querySelector('#duration').value > 0){
        let id = db.collection('TrainSchedule').doc().id
        db.collection('TrainSchedule').doc(id).set({
            destination: document.querySelector('#destination').value,
            ETA: ETA,
            duration: document.querySelector('#duration').value,
            minaway: minaway
        })
        document.querySelector('#destination').value = ''
        document.querySelector('#first-train').value = ''
        document.querySelector('#duration').value = ''   
    }
})

db.collection('TrainSchedule').onSnapshot(({docs}) =>{
    document.querySelector('.traininfo').innerHTML = ''
    docs.forEach(doc => {
        let {destination, ETA, duration, minaway} = doc.data()
        let traininfo = document.createElement('div')
        traininfo.innerHTML = `
        <div class="col s4 info">${destination}</div>
        <div class="col s3 info">${duration}</div>
        <div class="col s3 info">${moment(ETA, 'x').format('hh:mm a')}</div>
        <div class="col s2 info">${Math.ceil(minaway)}</div>
        `
        document.querySelector('.traininfo').append(traininfo)
    })
})

init()
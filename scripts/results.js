let story_list = $("ul")

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
    let stories = snap.data()['stories']
    for (i = 0; i < stories.length; i++) {
        let new_item = document.createElement('li')
        new_item.innerHTML = stories[i]['name'] + " wrote: " + stories[i]['story'] + ", and was rewarded " + stories[i]['current_points'] + " points. They now have " + stories[i]['points'] + " points."
        story_list.append(new_item)
    }
})

$("#submit").click(function () {
    db.runTransaction((transaction) => {
        return transaction.get(db.collection('rooms').doc(sessionStorage.getItem('room'))).then(function (snap) {
            let stories = snap.data()['stories'];
            for (i = 0; i < stories.length; i++) {
                stories[i]['current_points'] = 0
                stories[i]['story'] = ""
            }
            transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), {stories: stories,
            votes: 0, rounds: snap.data()['rounds'] - 1})
        })
    }).then(function () {
        db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
            if(Math.floor(snap.data()['rounds'] / snap.data()['players'].length) == 0){
                document.location.href = "./winner.html";
            } else {
                document.location.href = "./game2.html";
            }
        })
    })
})
function bubbleSort(players) {
    let player_count = players.length;
    for (let i = player_count - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (players[j - 1]['points'] > players[j]['points']) {
                let temp = players[j - 1];
                players[j - 1] = players[j];
                players[j] = temp;
            }
        }
    }
    return players;
}

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
    let all_players = snap.data()['stories']
    let sorted_players = bubbleSort(all_players)
    for (i = sorted_players.length - 1; i >= 0; i--) {
        console.log(sorted_players)
        let new_item = document.createElement('li')
        new_item.innerHTML = sorted_players[i]['name'] + " ended with " + sorted_players[i]['points'] + " points."
        $("ul").append(new_item)
    }

    db.collection('users').doc(sessionStorage.getItem('document_id')).get().then(function (snap2) {
        for (let i = 0; i < snap.data()['stories'].length; i++) {
            if (snap.data()['stories'][i]['name'] == sessionStorage.getItem('name')) {
                let new_coins = (snap.data()['stories'][i]['points'] * 10) + snap2.data()['coins']
                console.log(new_coins)
                db.collection('users').doc(sessionStorage.getItem('document_id')).update({
                    coins: new_coins
                })
            }
        }
    })
})

$("#finish").click(function () {
    db.collection("rooms").doc(sessionStorage.getItem('room')).delete().then(() => {
        document.location.href = "./main.html";
    });
})
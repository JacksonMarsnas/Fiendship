function display_stories(){
    let story_list = $("#player_list")
    db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
        let stories = snap.data()['stories']
        for (i = 0; i < stories.length; i++) {
            let new_story = document.createElement('p')
            let new_image = document.createElement('img')
            let new_line = document.createElement("hr")
            new_image.setAttribute("src", stories[i]['picture'])
            new_image.setAttribute("class", "picture")
            new_story.setAttribute('class', 'story')
            new_story.setAttribute('id', i)
            story_list.append(new_image)
            story_list.append(new_story)
            story_list.append(new_line)
            $("#" + i).html(stories[i]['name'] + " wrote: " + stories[i]['story'] + ", and was rewarded " + stories[i]['current_points'] + " points. They now have " + stories[i]['points'] + " points.")
        }
    })
}

function main(){
    display_stories()
    $("#submit").click(function () {
        db.runTransaction((transaction) => {
            return transaction.get(db.collection('rooms').doc(sessionStorage.getItem('room'))).then(function (snap) {
                let stories = snap.data()['stories'];
                for (i = 0; i < stories.length; i++) {
                    if(stories[i]['name'] == sessionStorage.getItem('name')){
                        stories[i]['current_points'] = 0
                        stories[i]['story'] = ""
                        stories[i]['current_round'] = stories[i]['current_round'] + 1
                    }
                }
                transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), {stories: stories,
                votes: 0})
            })
        }).then(function () {
            document.location.href = "./game2.html";
        })
    })
}

main();
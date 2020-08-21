const { link } = require("fs");

document.write('<script type="text/javascript" src="search_resturants.js"></script>');


class Buisness_Entry {
    #name;
    #location;
    #average_rating;
    #reviews;
    #start_hour;
    #end_hour;
    #chosen;
    #phone_number;
    #link;

    public:
        constructor(buissness_name, loc) {
            name = buissness_name;
            location = loc;
            average_rating = findAverageRating();
            start_hour = Date.parse('00:00:00');
            end_hour = Date.parse('00:00:00');
            chosen = false;
        }

        getName() { return name; }

        getLocation() { return location; }

        findAverageRating() {
            YelpREST("/businesses/9QFiF_YBCKvWsUu50G_yxg/rating").then({data}) => {
                let avg_rating = 0;
                for (i = 0; i < 3; ++i) {
                    data[i].rating += avg_rating;
                }
            });
            return avg_rating / 3;
        }

        getRating() {
            return average_rating;
        }

        setChosen(new_chosen) {
            chosen = new_chosen;
        } 

        getChosen() { return chosen; }

        findPhone();

        getPhone() { return phone_number; }

        findLink();

        getLink() { return link; }

        setReviews(new_list) { reviews = new_list; }

};
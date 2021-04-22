$(function () { //ketika website telah ready

    the_game = function () {

        if (check_bullet_hits_floor(bullet1) || check_bullet_hits_hero(bullet1)) { //cek apakah bullet mengenai lantai ataupun hero
            set_bullet_to_initial_position(bullet1); //kembali ke posisi awal
            bullet1.attr('data-speed', randomSpeed);
        } else {
            bullet_down(bullet1);               //turunkan bullet
        }

        if (check_bullet_hits_floor(bullet2) || check_bullet_hits_hero(bullet2)) {
            set_bullet_to_initial_position(bullet2);
            bullet2.attr('data-speed', randomSpeed);
        } else {
            bullet_down(bullet2);
        }

        if (check_bullet_hits_floor(bullet3) || check_bullet_hits_hero(bullet3)) {
            set_bullet_to_initial_position(bullet3);
            bullet3.attr('data-speed', randomSpeed);
        } else {
            bullet_down(bullet3);
        }

        if (check_bullet_hits_floor(bullet4) || check_bullet_hits_hero(bullet4)) {
            set_bullet_to_initial_position(bullet4);
            bullet4.attr('data-speed', randomSpeed);
        } else {
            bullet_down(bullet4);
        }

        if (life > 0) {
            anim_id = requestAnimationFrame(the_game); //untuk memanggil frame/function ini terus menerus
        } else {
            girl.css("background-image", "url('hero_girl_lose.png')");
            clearTimeout(timer);
            stop_the_game();                    //fungsi menghentikan program
        }
    };

    anim_id = requestAnimationFrame(the_game);  //requestAnimationFrame adalah fungsi javaScript, returns an ID to stop animation.
                                                //memanggil fungsi the_game untuk pertama kali
    bullet1.attr('data-speed', randomSpeed);
    bullet2.attr('data-speed', randomSpeed);
    bullet3.attr('data-speed', randomSpeed);
    bullet4.attr('data-speed', randomSpeed);
});
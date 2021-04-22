$(document).on('mousemove', function (e) {      //setiap kali mouse digerakkan, ambil event 'e' pergerakan mouse tersebut
    hero.css('left', e.pageX);                //set left dari hero sesuai dengan posisi x dari cursor
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomSpeed(){
    randomizedSpeed = getRndInteger(speed - 2, speed + 1);      //random speed
    if(randomizedSpeed <= 0) randomizedSpeed = 2;
    return randomizedSpeed;
}

function bullet_down(bullet) {                                  //parameter bullet
    bullet_current_position = parseInt(bullet.css('top'));      //ambil current position dari bullet
    bullet_speed = parseInt(bullet.attr('data-speed'));
    bullet.css('top', bullet_current_position + bullet_speed);  //set position Y dari bullet
}

function check_bullet_hits_floor(bullet) {
    if (collision(bullet, floor)) {             //cek apakah bullet dan floor bersentuhan
        show_bulls_eye(bullet);                 //munculkan efek jatuh
        decrement_life();                       //kurangi nyawa
        change_delay("hero_girl_worried.png", 1000);
        return true;                            //kembalikan nilai bahwa bullet mengenai floor
    }
    return false;                               //kembalikan nilai tidak mengenai floor
}

function set_bullet_to_initial_position(bullet) {
    bullet.css('top', bullet_initial_position); //kembalikan posisi Y bullet ke nilai posisi awal
}

function show_bulls_eye(bullet) {
    burst_num = bullet.attr('data-burst');//ambil nilai attribute dari bullet
    $('#burst' + burst_num).show();       //menggunakan format burst# kita dapat mengetahui bullyseye mana yang dimunculkan
    hide_bulls_eye(burst_num);               //function hide
}

function hide_bulls_eye(burst_num) {
    setTimeout(function () {                    //fungsi delay agar efek masih dapat dilihat
        $('#burst' + burst_num).hide();   
    }, burst_delay);
}

function decrement_life() {
    life--;                                     //kurangi life dengan 1
    if(life < 0) life = 0;
    life_span.text(life);                       //set text dari span life
}

function check_bullet_hits_hero(bullet) {     //fungsi cek collision hero dengan bullet
    if (collision(bullet, hero)) {
        bullet_top = parseInt(bullet.css('top'));
        if (bullet_top < hero_top) {          //cek apakah bullet mengenai atas dari hero atau samping dari hero
            if(getRndInteger(1,2) == 1){        //terdapat dua sprite random untuk memberi efek permainan
                change_delay("hero_girl_saved.png", 800);
            }
            else{
                change_delay("hero_girl_saved_2.png", 800);
            }
            update_score();                     //fungsi update score
            return true;                        //kembalikan nilai benar
        }
    }
    return false;                               //kembalikan nilai salah
}

function change_delay(url, waktu){              //custom function untuk mengubah sprite ke keadaan awal setelah beberapa waktu
    girl.css("background-image", "url('" + url + "')");
    clearTimeout(timer);
    timer = setTimeout(() => {
        girl.css("background-image", "url('hero_girl_idle.png')");
    }, waktu);
}

function update_score() {
    score++;                                        //tambahkan nilai score dengan 1
    if (score % 10 === 0 && speed <= max_speed) {   //penambahan kecepatan sesuai dengan score
        speed++;
        if(speed > max_speed) speed = max_speed;
        show_levelup();
        change_delay("hero_girl_levelup.png", 1200);
    }
    score_span.text(score);                     //update text dari span score
    score_1.text(score);                        //update text dari span score di hero
}

function show_levelup(){                        //fungsi untuk menunjukkan label level up
    label1.show();
    label1.text("Lv Up\nLife +1");
    label1.slideUp(3000);
    life++;
    life_span.text(life); 
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);              //stop frame pada penggunaan variabel anim_id
    $("html").css('cursor', 'default');         //munculkan cursor pada saat kalah
    $("body").css('cursor', 'default');
    restart.slideDown();                        //fungsi animasi slideDown untuk memunculkan restart
}

restart.click(function () {
    location.reload();                          //reload location dari semua css
});
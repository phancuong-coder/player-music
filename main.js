let audio=document.querySelector('audio');
let h4El=document.querySelector('h4');
let authorName=document.querySelector('#author');
let avatar=document.querySelector('.avatar');
let listRender=document.querySelector('.listRender');
let bttnPlay=document.querySelector('#bttn-play');
let bttnRight=document.querySelector('#bttn-right');
let bttnLeft=document.querySelector('#bttn-left');
let seekTool=document.querySelector('#duration');
let bttnRandom = document.querySelector('.fa-shuffle');
let bttnRepeat=document.querySelector('.fa-repeat');
let slider=document.querySelector('#duration');

// slider.addEventListener('input',function(){
//     let x= slider.value;
//     let color=`linear-gradient(90deg,blue ${x}% ,red ${x}%)`;
//     slider.style.background=color;

// });

// function slider(){

// }

function play(){
    if(document.querySelector('.fa-play')){
        bttnPlay.classList.remove('fa-play');
        bttnPlay.classList.add('fa-pause');
        audio.play();
        bttnPlay.removeEventListener('click',play);
        bttnPlay.addEventListener('click',pause);
    };
};
function pause(){
    if(document.querySelector('.fa-pause')){
        bttnPlay.classList.remove('fa-pause');
        bttnPlay.classList.add('fa-play')
        audio.pause();
        bttnPlay.removeEventListener('click',pause);
        bttnPlay.addEventListener('click',play)
    };
};

let listSong = {
    isShuffle:false,
    isRepeat:false,
    currentIndex:0,
    
    songs:[
        {
            avatarSmall:'anhs/wtfSmall.png',
            avatar:'anhs/wtf.png',
            author:'Nguyên & Như',
            song:'Như Một Giắc Mơ ',
            path:'./audio/Như Một Giắc Mơ (verson Ác Mộng).m4a'
        },
        {
            avatarSmall:'anhs/NFSmall.png',
            avatar:'anhs/NF.png',
            author:'NF',
            song:'When I Grow Up',
            path:'./audio/nf_when_i_grow_up_-3350490649202708532.mp3',

        },
        {
            avatarSmall:'anhs/lilySmall.png',
            avatar:'anhs/lily.png',
            author:'Alan Walker',
            song:'Lily',
            path:'./audio/alan_walker_k_391_emelie_hollow_lily_lyrics_7255627471211280105.mp3'

        },
        {
            avatarSmall:'anhs/kingSmall.png',
            avatar:'anhs/king.png',
            author:'Ava Max',
            song:'Kings & Queens',
            path:'./audio/ava_max_kings_queens_official_music_video_5117977010310640655.mp3'

        },
        {
            avatarSmall:'anhs/thucuoiSmall.jpg',
            avatar:'anhs/thucuoi.jpg',
            author:'Mr.T ft Yanbi',
            song:'Thu cuối',
            path:'./audio/thu_cuoi_slowed_reverb_mr_t_ft_yanbi_hang_bingboong_lofi_ver_video_lyrics_-6307118519773004119.mp3'

        },
        {
            avatarSmall:'anhs/dangemSmall.png',
            avatar:'anhs/dangem.png',
            author:'Dương Edward',
            song:'Dáng em',
            path:'./audio/lofi_lyrics_dang_em_duong_edward_x_mechill_kho_nhac_tiktok_trung_quoc_lofi_loi_viet_-4565582669101060819.mp3'

        },
        {
            avatarSmall:'anhs/hetthoiSmall.png',
            avatar:'anhs/hetthoi.png',
            author:'Blackbi',
            song:'Những kẻ hết thời',
            path:'./audio/lyric_mv_nhung_ke_het_thoi_neko_x_eszi_x_mc_formosa_x_blackbi_-1932216064731827319.mp3'

        },
        {
            avatarSmall:'anhs/vidauSmall.png',
            avatar:'anhs/vidau.png',
            author:'Duy Khiêm',
            song:'Ví dầu đưa dâu',
            path:'./audio/vi_dau_dua_dau_lofi_lyrics_duy_khiem_x_dieu_kien_x_mechill_2467977542537514749.mp3'

        },
        {
            avatarSmall:'anhs/runawaySmall.png',
            avatar:'anhs/runaway.png',
            author:'Aurora',
            song:'Runaway',
            path:'./audio/runaway_aurora_lyrics_vietsub_1555789194168072590.mp3'

        },
        {
            avatarSmall:'anhs/teenvongcoSmall.jpg',
            avatar:'anhs/teenvongco.jpg',
            author:'Vĩnh Thiên Kim',
            song:'Teen Vọng cổ',
            path:'./audio/teen_vong_co_remix_tiktok_umie_x_teddy_x_mechill_-8372574317411424439.mp3'

        },
        {
            avatarSmall:'anhs/tinhkaSmall.png',
            avatar:'anhs/tinhka.png',
            author:'DANHKA',
            song:'Tình Ka',
            path:'./audio/tinh_ka_lofi_ver_danhka_tung_giot_nang_chieu_xuong_het_con_duong_6541070050081421716.mp3'

        },

    ],
    
    renderPlaylist:function(){
        let html=this.songs.map(function(song){
            return`
            <div class="card">
                <div class="smallA" style="background-image: url(${song.avatarSmall})" ></div>
                <div class="infor">
                    <h5>${song.song}</h5>
                    <p id="smallN">${song.author}</p>
                </div>
                <i class=" none fa-solid fa-play"></i>
            </div>`
        });
        
        let htmls=html.join('');
        listRender.innerHTML=htmls;
    },
    getCardActive:function(){
        let cards=document.querySelectorAll('.card');
        for(let i=0;i<cards.length;i++){
            if(this.currentIndex==i){
                let newCard=cards[i];
                newCard.classList.add('active');
                let newICon=newCard.lastElementChild;
                newICon.classList.remove('fa-play');
                newICon.classList.add('fa-pause');
                setTimeout(function(){
                    document.querySelector(`.card.active`).scrollIntoView(false);
                },500)

            }else{
                let preCard=cards[i];
                preCard.classList.remove('active');
                let preICon=preCard.lastElementChild;
                preICon.classList.remove('fa-pause')
                preICon.classList.add('fa-play')


            }
        }      
    },
    

    
    getCurrentSong:function(){
        return this.songs[this.currentIndex];
    },
    loadCurrentSong:function(){
        h4El.textContent=this.getCurrentSong().song;
        authorName.textContent=this.getCurrentSong().author;
        avatar.style.backgroundImage=`url(${this.getCurrentSong().avatar})`;
        audio.src=this.getCurrentSong().path;
    },
    nextSong:function(){
        this.currentIndex++;
        if(this.currentIndex>this.songs.length-1){
            this.currentIndex=0;
        };
        seekTool.value=0;
        this.loadCurrentSong();
        if(document.querySelector('.fa-pause')){
            play()
        }
        if(document.querySelector('.fa-play')){
            play();
        }   

    },
    previousSong:function(){
       this.currentIndex--;
        if(this.currentIndex<0){
          this.currentIndex=this.songs.length-1;
        };
       this.loadCurrentSong();
        seekTool.value=0;
        if(document.querySelector('.fa-pause')){
            play();
        };
        if(document.querySelector('.fa-play')){
            play();
        };
    },
    randamSong:function(){
        let randomSong;
        do{
            randomSong=Math.floor(Math.random()*this.songs.length);

        }while(randomSong===this.currentIndex)
        this.currentIndex=randomSong;
        this.loadCurrentSong()
        seekTool.value=0;
        if(document.querySelector('.fa-pause')){
            play();
        };
        if(document.querySelector('.fa-play')){
            play();
        };
    },
    endedSong:function(){
        bttnRight.click();
    },


    
    handleEvent:function(){
        let _this=this;
        // play song
        bttnPlay.addEventListener('click',play);
        //animate
        let avatarActive= avatar.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration:25000,
            iterations:Infinity
        })
        avatarActive.pause();
        audio.addEventListener('play',function(){
            avatarActive.play();
            _this.getCardActive();
    
            
            
        });
        audio.addEventListener('pause',function(){
            avatarActive.pause();
            
        })
        //progress playback position
        audio.addEventListener('timeupdate',function(){
            let currentTime = audio.currentTime;
            let progress = currentTime/audio.duration*100;
            if(progress){
                seekTool.value=progress
            };
            let color=`linear-gradient(90deg,rgb(56,176,0) ${progress}% ,white ${progress}%)`;
            slider.style.background=color;
        });
        //seeking
        seekTool.addEventListener('change',function(){
            let timedSeek=seekTool.value;
            audio.currentTime=timedSeek*audio.duration/100
        });

        // next song
        bttnRight.addEventListener('click',function(){
            if(_this.isShuffle){
                _this.randamSong();
            }else{
                _this.nextSong();
            }
        });
        //previous song
        bttnLeft.addEventListener('click',function(){
            if(_this.isShuffle){
                _this.randamSong();
            }else{
                _this.previousSong();
            }
        });
        //random song
        bttnRandom.addEventListener('click',function(){
            if(!_this.isShuffle){
                _this.isShuffle=true;
                bttnRandom.classList.add('active');
            }else{
                _this.isShuffle=false;
                bttnRandom.classList.remove('active');
            };
            
        });
        //repeat song when end
        bttnRepeat.addEventListener('click',function(){
            if(!_this.isRepeat){
                _this.isRepeat=true;
                bttnRepeat.classList.add('active');
            }else{
                _this.isRepeat=false;
                bttnRepeat.classList.remove('active');
            }

        });
        
        audio.addEventListener('ended',function(){
            if(_this.isRepeat){
                audio.play()
            }else(
                _this.endedSong()
            );
            
            
        });


    },


    
};



function start(){
    listSong.renderPlaylist();
    listSong.loadCurrentSong();
    listSong.handleEvent();
    
    

}
start();



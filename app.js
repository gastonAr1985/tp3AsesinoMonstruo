new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
        descipcion:'',
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },

        //funciona bien
        empezarPartida: function(){
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.hayUnaPartidaEnJuego= true;
            this.turnos=[]
            
        },

        reiniciar: function(){
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.hayUnaPartidaEnJuego= false;
            this.turnos=[]
        },

        atacar: function () {
            let danioAlMonstruo = this.calcularHeridas(this.rangoAtaque[0],this.rangoAtaque[1])
            this.saludMonstruo -= danioAlMonstruo;
            let evento = ({
                esJugador: true,
                danio: danioAlMonstruo
            })
            this.registrarEvento(evento)
           if( this.verificarGanador()){
               return
           }
            this.ataqueDelMonstruo()
           
        
        },

        ataqueEspecial: function () {
            let danioMonstruo = this.calcularHeridas(this.rangoAtaqueEspecial[0],this.rangoAtaqueEspecial[1])
            this.saludMonstruo -= danioMonstruo;
            let evento1 = ({
                esJugador: true,
                danio: danioMonstruo
            })
            this.registrarEvento(evento1)
            this.ataqueDelMonstruo()
            this.verificarGanador()
            
        },

        curar: function () {
                if(this.saludJugador == 100){
                    alert('Tenes 100 % de vida')
                }else if(this.saludJugador < 100 && this.saludJugador >=90){
                    alert('Aun no podes curar')
                }else{
                        this.saludJugador += 10
                       // console.log(this.saludJugador)
                        this.ataqueDelMonstruo(this.rangoAtaqueDelMonstruo[0],this.rangoAtaqueDelMonstruo[1])
                        //console.log(this.saludJugador)
                }
        },

        
        
        registrarEvento(evento) {
            if(evento.esJugador){
                this.turnos.unshift({
                    esJugador: evento.esJugador,
                    text:'El jugador golpea al monstruo por ' + evento.danio,
                    
                })
            }else{
                this.turnos.unshift({
                    esJugador: evento.esJugador,
                    text:'El monstruo golpea al jugador por ' + evento.danio,
            })
            }
            

       },

//funciona bien
        terminarPartida: function () {
            if(confirm('Desea terminar la partida?')){
            this.hayUnaPartidaEnJuego =false

           }else{
               this.hayUnaPartidaEnJuego = true
           } 
           
        },

        ataqueDelMonstruo: function () {
            let danioJugador = this.calcularHeridas(this.rangoAtaqueDelMonstruo[0],this.rangoAtaqueDelMonstruo[1])
            this.saludJugador -= danioJugador
            let evento2 = ({
                esJugador: false,
                danio: danioJugador
            })
            this.registrarEvento(evento2)
            this.verificarGanador()
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) +1 , min);

        },

//funciona bien tal vez ajustar validaciones
        verificarGanador: function () {
            if(this.saludMonstruo <=0){
               if(confirm('Ganaste, quieres jugar de nuevo?')){
                    this.empezarPartida();
                    console.log('1')
               }else{
                 
                  this.reiniciar()
               }
                return true;
               
            }else if(this.saludJugador <=0){
                if(confirm('Perdiste, quieres jugar de nuevo?')){
                    this.empezarPartida();
                    console.log('1')
               }else{
                 
                  this.reiniciar()
                   
               }
                return true;
               }

            return false;
        
        },

                            
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});
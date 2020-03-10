import React from 'react';

// import logo from './logo.svg';
// import './App.css';   how u import css
var inte;
var inte2;
var mintosec = 25* 60;
var breaksec = 5 * 60;
var clicked = false;
var breakbegan = false;



class App extends React.Component {

  state = {
    break : 5,
    session: 25,
    minute: '25:00',
    second: '00',
    st : 'Session'
  }

//should reset 
reset = () =>{
  clearInterval(inte)
  clearInterval(inte2)
  clicked = false
  breakbegan = false
  this.setState({
    break: 5,
    session: 25,
    minute: '25:00',
    st: 'Session'
  })
  var q1 = document.getElementById('beep');

    try {
      q1.pause();
      q1.currentTime = 0;
      
    } catch (error) {
      console.log('i dont care')
    }
        

}

//formatting
convertS = (s) =>{
  var min = Math.floor(s/60);
  var sec = s % 60;


  if(s < 600){
    if(sec < 10){
      return '0' + min + ':0' + sec

    }
    else{
      return '0' + min + ':' + sec
    }
   
  }
  else{

    if(sec < 10){
      return  min + ':0' + sec

    }
    else{
      return   min + ':' + sec
    }
  }
  
}
//break interval init
break = () =>{
  


inte2 = setInterval(this.startbreak,1000 )
}

//break functiion

startbreak = ()=> {

  
  console.log(breakbegan)
  
  breaksec = breaksec - 1
  
  if(breaksec  < 0){
    
    clearInterval(inte2);
    clearInterval(inte)
    
  
  
    clicked = false;
    
    breakbegan = false
    mintosec = this.state.session * 60
      breaksec = this.state.break * 60
      this.setState({
        minute: this.convertS(mintosec),
        st: 'Session'
      })
      // audioele.play()
      var q1 = document.getElementById('beep');
        q1.play();

console.log(q1)
      inte = setInterval(this.active, 1000)
      
  }
  else{
    var c = this.convertS(breaksec) 
    console.log(c)
    this.setState({
      st: 'Break',
      minute: c,
   
     
    })
    // audioele.stop()
     


    
  }
  
  

}
//start counter
inte = () =>{
clicked = !clicked
if(clicked && breakbegan === false ){
  
inte = setInterval(this.active, 1000)

}
else if(clicked && breakbegan === true){
  inte2 = setInterval(this.startbreak, 1000)
  
}
else{
  clearInterval(inte)
  clearInterval(inte2)
}


}




//start counter function
active = () => {
  
  mintosec = mintosec - 1


    
    if(mintosec < 0){
      
      clearInterval(inte);
      clearInterval(inte2);
      
     
    
      breakbegan = !breakbegan
     
      mintosec = this.state.session * 60
      breaksec = this.state.break * 60
      this.setState({
        minute: this.convertS(breaksec),
        st: 'Break'
      })
      
    // audioele.play()
    var q1 = document.getElementById('beep');
        q1.play();

console.log(q1)
      
      inte2 = setInterval(this.startbreak,1000 )
      
    }
    else{
        
      var c = this.convertS(mintosec) 
      console.log(c)
      this.setState({
        st: 'Session',
        minute: c,
     
       
      })
    // audioele.stop()
      
    }
    
    


}

up = (what) => {
if(what === 'session'){
  if(this.state.session !== 60){
    var min = this.state.session + 1;
   
    mintosec  = min * 60

    this.setState({
      session: this.state.session + 1 ,
      minute: this.convertS(min * 60)

    })
  }
}
if(what === 'break'){
  if(this.state.break !== 60){
    breaksec = (this.state.break + 1) * 60
    this.setState({
      break: this.state.break + 1
    })
  }
}
}

down = (what) => {
  if(what === 'session'){
    var min = this.state.session - 1;
    
    if(this.state.session !== 1){
      mintosec  = min * 60
      this.setState({
        session: this.state.session - 1,
        minute: this.convertS(min * 60) 

      })
    }
  }

  if(what === 'break'){
    if(this.state.break !== 1){
      breaksec = (this.state.break - 1) * 60
      this.setState({
        break: this.state.break - 1
      })
     
    }
  }
}

  render(){
    return (
      <div style={back}>
        <audio  className='clip'  id='beep' src='https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/000%20to%20080%20bpm/1182[kb]070_laidback-swingy-kick-snare-hat.wav.mp3'></audio>
      <div style={calBack} >
        <div style={sep}>
          <div style={pos}>
          

          </div>
          
         

        </div>
        <div style={CalLayout}>
        <div></div>
        <div style={ses}>
          <h1>Pomodoro Clock</h1>
          <div style={twocol}>
            <div>
              <h3 id='break-label'>Break Length</h3>
              <div style={three}>
                <button id="break-increment" onClick={this.up.bind(this, 'break')}>up</button>
                <label id="break-length">{this.state.break}</label>
                <button id="break-decrement" onClick={this.down.bind(this, 'break')}>Down</button>

              </div>
              </div> 
              <div>
                <h3 id="session-label">Session Length</h3>
                <div style={three}>
                <button id="session-increment" onClick={this.up.bind(this, 'session')}>up</button>
         <label id="session-length">{this.state.session}</label>
                <button id="session-decrement" onClick={this.down.bind(this, 'session')}>Down</button>

                </div>
              </div>
           
            
              <div style={ses2}>
        <h2 id="timer-label">{this.state.st}</h2>
        <div>
        <label id='time-left'>{this.state.minute}</label>
       
          </div>
                <button id='start_stop' onClick={this.inte}>Start/Stop</button>
                <button id='reset' onClick={this.reset}>Reset</button>
         </div>
          </div>
        

        </div>

         


     
        </div>

      </div>
    </div>
    
    );
    
}

}


const three = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
}

const pos = {
position: 'relative',






}

const ses = {

  display: 'grid',
  gridTemplateRows: '1fr 2fr 1fr'
}

const ses2 = {

  display: 'grid',
  gridTemplateRows: '.5fr .5fr .5fr'
}





const CalLayout = {
display: 'grid',
gridTemplateColumns: '.5fr 2fr .5fr',
// gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
height: '100%',
width: '100%'

}

const sep ={
display: 'grid',

gridTemplateRows: '1fr 1fr',

}

const calBack = {
display: 'grid',

gridTemplateRows: '20% 80%',


position: 'absolute',
top:'100px',

backgroundColor: '#202027',
width: '100%',
height: '100%',

}

const twocol ={
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
 
  
}

      
  





const back = {
  backgroundColor: '#202027'
}

// const inside = {
//   display: 'grid',
//   gridTemplateColumn: 'auto',
 
//   backgroundColor: '#202027',
//   position: 'relative',

//   top: '200px',
  
// }
export default App;

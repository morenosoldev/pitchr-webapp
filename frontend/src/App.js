import {useEffect} from 'react';
import IndexRouters from "./router/index"
//scss
//import "./assets/scss/socialv.scss"
//

function App() {
  useEffect(() => { 
    let script = document.createElement('script');
    script.src = 'https://unpkg.com/convertapi-js/lib/convertapi.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  })
  

  return (
    <div className="App">
      <IndexRouters />
    </div>
  );
}

export default App;

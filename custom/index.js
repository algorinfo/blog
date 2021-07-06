// import './main.scss';
import "./tailwind.css";
import 'alpinejs';
// ai is my namespace
const html = document.getElementsByTagName('html')[0];

function aiCheckTheme(){
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    // document.documentElement.classList.add('dark')
    html.classList.add('dark');
    html.classList.remove('white');
  } else {
    html.classList.add('white');
    html.classList.remove('dark');
  }
}

window.aiDarkMode = function(){
  aiCheckTheme();
  console.log("From alpinejs!!!");
  return {
    toggle(){
      if(html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('white');
        localStorage.theme = 'white';
      } else {
        html.classList.add('dark');
        html.classList.remove('white');
        localStorage.theme = 'dark';
      }
    }
  };
};

window.aiContactForm = function(){
  return {
    formData: {
      email: '',
    },
    message: '',
    isOk: true,
    firstTime: true,
    submitData(){
      if (this.firstTime){
        
        fetch('/suscribe', {
          method: 'POST',
          headers: { 'Contet-type': 'application/json'},
          body: JSON.stringify(this.formData)
        })
          .then((response)=> {
            if (response.status === 200 || response.status === 201){
              this.message = "🤗 Te enviaremos un mail para que confirmes!";
              this.firstTime = false;
              this.isOk = true;
            } else {
              this.message = "🥵 Algo salio mal ";
              this.isOk = false;
            }
            
          })
          .catch(()=> {
            this.isOk = false;
            this.message = "🥵 Algo salio mal ";
          });
      } else {
        this.message = "😔 El mensaje ya se envio antes";
        this.isOk = false;
      }
    }
  };
};

// export default {helloWorld, aiHtmlDarkMode};


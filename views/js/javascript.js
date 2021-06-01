function myFunction(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";
  }
  function valideazaNume() {
    let x = document.getElementById('nume');
    let xx=document.getElementById('nume').value;
    let y=/^[A-Za-z]*$/;
    if (!y.test( xx )) 
    {
      alert("Numele trebuie sa contina doar litere");
      return false;
    }
  }
  function valideazaPrenume() {
    let x = document.getElementById('prenume');
    let xx=document.getElementById('prenume').value;
    let y=/^[A-Za-z]*$/;
    if (!y.test( xx )) 
    {
      alert("Prenumele trebuie sa contina doar litere");
      return false;
    }
  }
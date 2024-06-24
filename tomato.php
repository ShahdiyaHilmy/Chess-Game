<!DOCTYPE html>
<html>
    <head>
        <title>Sign In </title>
        <link rel="stylesheet" href="tomato.css">
        </head>

<p id="image"></p>


<p id="solution"></p>

<div class="one" onclick="redirectToGameOver()">&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<script>
    let x = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    document.write(x);
    function redirectToGameOver() {
        window.location.href = 'gameover.html'; // Replace 'gameover.html' with the actual URL of your "game over" page
    }
</script></div>
<div class="two" onclick="redirectToGameOver()">&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<script>
    let y = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    document.write(y);
    function redirectToGameOver() {
        window.location.href = 'gameover.html'; // Replace 'gameover.html' with the actual URL of your "game over" page
    }
</script></div>
<div class="three" onclick="redirectToGameOver()">&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<script>
    let z = Math.floor(Math.random() * 10) + 1;
    document.write(z);

    // Function to redirect to the "game over" page
    function redirectToGameOver() {
        window.location.href = 'gameover.html'; // Replace 'gameover.html' with the actual URL of your "game over" page
    }
</script></div>


      




      <script type="text/javascript" src="tomato.js"></script>


     
    </body>
</html>
<?php 
    session_start();
    if(!isset($_SESSION['user'])){
        header("location:signin.php"); 
        exit();
    }

    if(isset($_GET['logout'])){
        unset($_SESSION['user']);
        header("location:home.html"); 
        exit();
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Sign In </title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="new.css">
        <link rel="stylesheet" href="game.css">
    
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    </head>
    <body>
        <div class="all">
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                <span class="image">
                </span>

                <div class="text logo-text">
                    <span class="name">Royal Rivals</span>
                </div>
            </div>

            <i class='bx bx-chevron-right toggle'></i>
        </header>

            <div class="menu">
                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="home.html">
                            <i class='bx bx-home-alt icon' ></i>
                            <span class="text nav-text">Home</span>
                        </a>
                    </li>

                    
                    <li class="nav-link">
                        <a href="new.php">
                            <i class='bx bx-pie-chart-alt icon' ></i>
                            <span class="text nav-text">New Game</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <!-- <a href="scoreboard.php">
                            <i class='bx bx-bar-chart-alt-2 icon' ></i>
                            <span class="text nav-text">Score Board</span>
                        </a> -->
                    </li>

                </ul>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br><br><br><br><br><br><br>
            <div class="bottom-content">
                <li class="">
                    <a href="?logout">
                        <i class='bx bx-log-out icon' ></i>
                        <span class="text nav-text">Log Out</span>
                    </a>
                </li>
</div>

    <div class="container">


<div id="board"></div>
<div  id="player"></div>
<div id="info"></div>


    <script src="chess_p.js"></script>
    <script src="game.js"></script>
    </div>
      
      <a href="tomato.php"><button type="button" class="button_" onclick="location.reload();">New</button></a>

        <script>
        const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})


    </script>
    </body>
</html>
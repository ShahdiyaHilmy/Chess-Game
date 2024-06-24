<?php require("signup_class.php") ?>
<?php 
    if(isset($_POST['submit'])){
        $user=new RegisterUser($_POST['username'],$_POST['password']);
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Sign In </title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="signin.css">
    
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

        <div class="menu-bar">
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
            </div>
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
                <li class="nav-link">
                    <a href="signin.php">
                        <i class='bx bx-log-in icon' ></i>
                        <span class="text nav-text">Sign In</span>
                    </a>
                </li>
</div>

<div class="container">
        <input type="checkbox" id="check">
        <div class="login form">
          <header>Sign Up</header>
          <form action="" method="post" enctype="multipart/form-data" autocomplete="off">
            <p class="error"><?php echo @$user->error  ?></p>
                <p cass="sucess"><?php echo @$user->sucess  ?></p>
            <input type="text" name="username" placeholder="Enter player email">
            <input type="password" name="password" placeholder="Enter player password">

            <button type="submit" name="submit" class="submit">Sign Up</button>
          </form>
          <div class="signup">
            <span class="signup">Already have an account?
            <label for="check" ><a href="signin.php" >Login</label>      </div>
        

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

// modeSwitch.addEventListener("click" , () =>{
//     body.classList.toggle("dark");
    
//     if(body.classList.contains("dark")){
//         modeText.innerText = "Light mode";
//     }else{
//         modeText.innerText = "Dark mode";
        
//     }
// });
    </script>
    </body>
</html>
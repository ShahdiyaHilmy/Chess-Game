<?php
class RegisterUser{
    private $username;
    private $real_password;
    private $encrypt_password;
    public $error;
    public $sucess;
    private $storage ="data.json";
    private $stored_users;
    private $new_user;


public function __construct($username,$password){
    $this->username = trim(filter_var($username, FILTER_SANITIZE_STRING));
    $this->real_password = filter_var(trim($password),FILTER_SANITIZE_STRING);

    $this->encrypt_password=password_hash($this->real_password,PASSWORD_DEFAULT);

    $this->stored_users=json_decode(file_get_contents($this->storage),true);

    $this->new_user = [
        "username" => $this->username,
        "password" => $this->encrypt_password,
    ];

    if($this->checkValues()){
        $this->insertUser();
    }


}

private function checkValues(){

    if(empty($this->username) || empty($this->real_password)){
        $this->error = "Both fields are not filled";
        return false;
    }
    else{
        return true;
    }

}

private function checkUsername(){

    foreach($this->stored_users as $user){
        if($this->username == $user['username']){
            $this->error = "username already exists";
            return true;
        }
    }
    return false;

}


private function insertUser(){

    if($this->checkUsername() == FALSE){
        array_push($this->stored_users,$this->new_user);
            if(file_put_contents($this->storage,json_encode($this->stored_users,JSON_PRETTY_PRINT))){
                return $this->sucess="pass";
            }else{
                return $this->error ="wrong";
            }
        }
    }

}



?>
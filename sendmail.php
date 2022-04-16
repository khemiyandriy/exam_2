<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = mew PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('khemiyandriy@gmail.com', 'Khemii Andrii');
$mail->addAddress('khemiyandriy@gmail.com');
$mail->Subject('Form from site');

$body = '<h1>New form</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p>Name: '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p>E-mail: '.$_POST['emeil'].'</p>';
}

$mail->Body = $body;

if(!$mail->send()){
    $message = 'Send error';
} else {
    $message = 'Send done!'
}

$response = ['message' => $message];

header('Content-type: applecation/json');
echo json_encode($response);
?>
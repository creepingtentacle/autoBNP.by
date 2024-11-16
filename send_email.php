<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "llza21022003@gmail.com"; // Замените на ваш адрес электронной почты
    $subject = "Новая заявка с сайта";
    $body = "Имя: $name\nЭлектронная почта: $email\nСообщение:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Произошла ошибка при отправке сообщения.";
    }
}
?>

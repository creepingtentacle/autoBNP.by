<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $phone = $_POST['phone'];

    $to = "llza21022003@gmail.com"; // Замените на ваш адрес электронной почты
    $subject = "Новая заявка с сайта";
    $body = "Телефон клиента: $phone";

    $headers = "From: no-reply@yourdomain.com";

    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Произошла ошибка при отправке сообщения.";
    }
}
?>

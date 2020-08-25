<?php
    $quality = $_GET['quality'];
$id = $_GET['id'];

$file_url = "";
$file_name = "";

if($quality == "HD") {
   $file_url = "https://img.youtube.com/vi/" . $id . "/maxresdefault.jpg";
   $file_name = "maxresdefault.jpg";
} else if($quality == "SD") {
   $file_url = "https://img.youtube.com/vi/" . $id . "/sddefault.jpg";
   $file_name = "sddefault.jpg";
} else if($quality == "HQ") {
   $file_url = "https://img.youtube.com/vi/" . $id . "/hqdefault.jpg";
   $file_name = "hqdefault.jpg";
} else if($quality == "MQ") {
   $file_url = "https://img.youtube.com/vi/" . $id . "/mqdefault.jpg";
   $file_name = "mqdefault.jpg";
} else if($quality == "def") {
   $file_url = "https://img.youtube.com/vi/" . $id . "/default.jpg";
   $file_name = "default.jpg";
}



header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=\"".$file_name."\""); 
readfile($file_url);
exit;
?>
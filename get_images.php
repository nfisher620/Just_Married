<?php
$images=glob('images/*');
$output_data =[
    'success'=> true,
    'files'=> $images,
    'errors' => ['An error has occured']
];
$output =json_encode($output_data);
print($output);
?>
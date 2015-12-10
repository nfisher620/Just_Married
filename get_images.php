<?php
//$images=glob($_POST['images/floral/*']);
//$output_data =[
//    'success'=> true,
//    'files'=> $images,
//    'errors' => ['An error has occured']
//];
//$output =json_encode($output_data);
//print($output);

require_once('mysql_connect.php');
$vendor_id = $_POST['vendor'];
$query = "SELECT * FROM vendor_photos WHERE vendor_id=$vendor_id";

$result = mysqli_query($conn,$query);
$output_array = ['success'=>false];
$photos = [];
if(mysqli_num_rows($result)>0){
    while($row = mysqli_fetch_assoc($result)){
        $photos[] = $row;
    }
    $output_array['success']=true;
    $output_array['images']=$photos;
} else{
    $output_array['errors']=mysqli_error($conn);
}
print(json_encode($output_array));
?>
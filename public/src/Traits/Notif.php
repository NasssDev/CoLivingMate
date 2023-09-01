<?php
namespace App\Traits;
use App\Entities\Expenditure;
use App\Factories\PDOFactory;
use App\Interfaces\Database;
trait Notif
{
    public function notif($notif_date)
    {
      date_default_timezone_set('Europe/Berlin');
      $notif_date=strtotime($notif_date);
      if(time('d')<$notif_date){
        return ('0');
      }else{
        return ('1');
      }
    }
}
$this->notif();
?>

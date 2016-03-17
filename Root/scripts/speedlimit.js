/**
 * Created by Andreas on 14.03.2016.
 */

function viewSpeed(index) {
    var speedlimit = 20;
    if(index > data.length){
        return;
    }
    if(data[index].name == "vehicle_speed" && data[index].value != 0){
        pent_tall = Math.round((data[index].value*1.609344));
        document.getElementById("car-speed").innerHTML = pent_tall;
        setTimeout(function(){
            viewSpeed(index+1);
        }, 50);
        if(pent_tall <= (speedlimit-5)){
            document.getElementById("car-speed").style.color="black";
            document.getElementById("notification").innerHTML = "";
            document.getElementById("notification").innerHTML = "Kjør fortere!";
        }else if(pent_tall > (speedlimit-5) && pent_tall <= speedlimit){
            document.getElementById("car-speed").style.color="green";
            document.getElementById("notification").innerHTML = "";
        }else if(pent_tall > 20 && pent_tall <= 24){
            document.getElementById("car-speed").style.color="orange";
            document.getElementById("notification").innerHTML = "Du er over fartsgrensen";
        }else{
            document.getElementById("car-speed").style.color="red";
            document.getElementById("notification").innerHTML = "SENK FARTEN!";
        }
    }else{
        viewSpeed(index+1);
    }
}

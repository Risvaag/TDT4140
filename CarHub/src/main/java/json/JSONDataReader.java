package json;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by andreanornes on 27.02.2016.
 */
public class JSONDataReader {

    private Gson gson = new Gson();

    /*
    * Reads json data from the given url and places it in a string
    * ATM it takes in a URL, but doesnt use it. Instead json is read from local file (which is reduced from a gazillion to 8697 lines).
    * */
    public String getVehicleSpeed(String filepath) throws Exception {
        String data = "";
        //BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
        BufferedReader in = new BufferedReader(new FileReader(filepath));

        //alternativly store data in an array
        //ArrayList<String> speed = new ArrayList<String>();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {

            //creates a CarInfo object from the gson data
            CarInfo obj = gson.fromJson(inputLine, CarInfo.class);
            //System.out.print(obj.getName() + " " + obj.getValue() + "\n");

            /*
            * Only store the vehicle speed
            * */
            if (obj.getName().equals("vehicle_speed") ){
                //System.out.print(obj.getName() + " " + obj.getValue() + "\n");
                //speed.add(obj.getName() + " " + obj.getValue() + "\n");
                data += obj.getName() + " " + obj.getValue() + "\n";

            }
        }
        in.close();
        //System.out.println(speed);
        return data;
    }



}



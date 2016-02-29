package retrievedata;

import com.oracle.javafx.jmx.json.JSONDocument;
import com.oracle.javafx.jmx.json.JSONReader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Iterator;

/**
 * Created by andreanornes on 26.02.2016.
 */
public class SimulatedDataRetriever {
    JSONReader in = null;
    JSON
    private String data;

    public void SimulatedDataRetriever(){
        try {
            URL simDataURL = new URL("http://openxcplatform.com.s3.amazonaws.com/traces/nyc/downtown-crosstown.json");
            in = new JSONReader(new InputStreamReader(simDataURL.openStream()));
            String inputLine;

            while ((inputLine = in.readLine()) != null){
                data += inputLine;
                System.out.println(data);
            }

            in.close();


        } catch (Exception e) {
            System.out.println(e.getMessage());
        }



    }


    public void printData(){
        System.out.println(data);
    }
}

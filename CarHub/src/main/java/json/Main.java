package json;

import java.net.URL;

/**
 * Created by andreanornes on 27.02.2016.
 */
public class Main {

    public static void main(String[] args){
        JSONDataReader jReader = new JSONDataReader();


        try {
            //This is the example file for car info - something wrong with encoding I think?
            URL urlSamplaCarInfo = new URL("http://openxcplatform.com.s3.amazonaws.com/traces/nyc/downtown-east.json");

            //This is a simple JSON example file - works
            URL urlJSONExample = new URL("http://jsonview.com/example.json");

            //
            jReader.readUrlToString(urlJSONExample);
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }
    }
}

package json;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by andreanornes on 27.02.2016.
 */
public class JSONDataReader {

    private static OkHttpClient client = new OkHttpClient();
    private Gson gson = new Gson();
    /*
    * Reads json data from the given url and places it in a string
    * */
    public String readUrlToString(URL url) throws Exception {
        String data = "";
        BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            data += inputLine + "\n";

            //System.out.print(gson.fromJson(inputLine, CarInfo.class));
            System.out.print(gson.fromJson(inputLine, ExInfo.class));
            break;
        }
        in.close();
        return data;
    }


    public void stringToJSON(String data) {

    }


    public String getJSON(String url) throws IOException {
        Request request = new Request.Builder()
                .url(url)
                .build();

        Response response = client.newCall(request).execute();
        return response.body().string();
    }


    public void getVehicleSpeed(){
        String json = null;
        try {

            json = getJSON("http://jsonview.com/example.json");
        } catch (Exception e) {

        }

        Gson gson = new Gson();
    }


}



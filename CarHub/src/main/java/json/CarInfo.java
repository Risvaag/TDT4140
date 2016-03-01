package json;

/**
 * Created by andreanornes on 28.02.2016.
 */
public class CarInfo {
    private String name;
    private double value;
    private double timestamp;

    public String getName() {
        return name;
    }

    public double getValue() {
        return value;
    }

    public double getTimestamp() {
        return timestamp;
    }

    public String toString() {
        return name + " " + value;
    }
}

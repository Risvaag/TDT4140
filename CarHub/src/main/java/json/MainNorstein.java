package mockup;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

public class MainNorstein extends Application{
	GridPane mainGrid = new GridPane();
	GridPane topLeftGrid = new GridPane();
	GridPane bottomLeftGrid = new GridPane();
	GridPane topRightGrid = new GridPane();
	GridPane bottomRightGrid = new GridPane();
	
	@Override
	public void start(Stage stage) throws Exception {
//		mainGrid.add(topLeftGrid, 0, 0);
//		mainGrid.add(topRightGrid, 1, 0);
//		mainGrid.add(bottomLeftGrid, 0, 1);
//		mainGrid.add(bottomRightGrid, 1, 1);
//		
//		Scene scene = new Scene(mainGrid);
//		mainGrid.setMaxWidth(800);
//		mainGrid.setMaxHeight(480);
//		stage.setScene(scene);
//		stage.setTitle("CarHub");
//		stage.show();	
		
		Pane page = (Pane) FXMLLoader.load(MainNorstein.class.getResource("design.fxml"));
		Scene scene = new Scene(page);
		stage.setScene(scene);
		stage.setTitle("CarHub");
		stage.show();
	}	
	
	
	public static void main(String[] args) {
		launch(args);
	}

	
}

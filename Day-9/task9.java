import java.util.Scanner;
import java.util.ArrayList;

public class task9 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter your string : ");   
        String value = sc.nextLine();
        
        //Spliting of string
        ArrayList<String> list = new ArrayList<String>();
        String x = "";
        for(int i = 0 ; i<value.length() ; i++){
            if(value.charAt(i) == ' ' || i==value.length()-1){
                if(i==value.length()-1){
                    x+=value.charAt(i);
                }
                list.add(x);
                x = "";
            }
            else{
                x+=value.charAt(i);
            }
        }

        System.out.println("number input : ");
        int number = sc.nextInt();
        //Getting index value
        for(int i =0 ; i<list.size() ; i++){
            if(i==number-1){
                System.out.println("Output : "+list.get(i));
            }
        }


        sc.close();
    }
}

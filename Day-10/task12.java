import java.util.Scanner;
import java.util.ArrayList;

public class task12 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter String : ");
        String value = sc.nextLine();

        ArrayList<String> list = new ArrayList<String>();

        String temp = "";
        for(int i = 0 ; i<value.length() ; i++){
            if(value.charAt(i) == ' ' || i == value.length()-1){
                if(i== value.length()-1){
                    temp+=value.charAt(i);
                }
                list.add(temp);
                temp = "";
            }
            else{
                temp+=value.charAt(i);
            }
        }
        System.out.println(list);

        temp = "";
        for(int i = list.size()-1 ; i>=0 ; i--){
            temp+=list.get(i)+" ";
        }

        System.out.println(value+" => "+temp);


        sc.close();
    }
}

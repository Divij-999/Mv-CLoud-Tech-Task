import java.util.Scanner;

public class task1{
    public static void main(String[] args) {
       Scanner sc = new Scanner(System.in);
        System.out.println("Enter String : ");
        String value = sc.nextLine();
        String temp="" ;

        System.out.println("Before White space removel : "+value);
        for(int i =0 ; i<value.length() ; i++){
            if(value.charAt(i)==' '){
                continue;
            }
            else{
                temp+=value.charAt(i);
            }
        }

        System.out.println("After White space removel : "+temp);
       sc.close();
    }
}
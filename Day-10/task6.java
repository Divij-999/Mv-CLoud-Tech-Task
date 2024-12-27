import java.util.Scanner;

public class task6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number : ");
        int value = sc.nextInt();
        // int value = 5;
        System.out.println();

        for(int i = 1 ; i<=value ; i++){

            for(int k = (value-i+1) ; k>=1 ;k--){
                System.out.print(" ");

            }
            for(int j = 1 ; j<=value ; j++){
                if(j==value || i==value || i==1 || j ==1){
                    System.out.print("*");
                }
                else{
                    System.out.print(" ");
                }
            }
            System.out.println();
        }

        sc.close();
    }
}

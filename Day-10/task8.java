import java.util.Scanner;

public class task8 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number : ");
        int value = sc.nextInt();
        System.out.println();
        
        for(int i = 1 ; i<=value ; i++){
            for(int k = (value-i+1) ; k>=1 ;k--){
                System.out.print(" ");

            }
            for(int j = 1 ; j<=i ; j++){
                if(j==1 || j==i || i==value){
                    System.out.print("* ");
                }
                else{
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
        sc.close();
    }
}

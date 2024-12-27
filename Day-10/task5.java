import java.util.Scanner;

public class task5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number : ");
        int value = sc.nextInt();
        // int value = 5;
        System.out.println();

        for(int i = 1 ; i<=(2*value-1) ; i++){
            for(int j = 1 ; j<=(2*value-1) ; j++){
                if(j==value || i==value || (j==1&&i<=value) || (j==(2*value-1) && i>value) || (i==1&&j>=value) || (i==(2*value-1) && j<value)){
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

import java.util.Scanner;

public class task11 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number : ");
        int value = sc.nextInt();
        System.out.println();
        
        
        var count = 0;
        for(int i = 1 ; i<=value+1 ; i++){
            for(int k = (value-i+1) ; k>=1 ;k--){
                System.out.print("  ");

            }
            for(int j = 1 ; j<=2*i-1 ; j++){
                if(j%2==1){
                    System.out.print("* ");
                }
                else{
                    System.out.print(count+" ");
                }
            }
            count +=1;
            System.out.println();
        }
        count-=2;
        for(int i = value ; i>0 ; i--){
            for(int k = (value-i+1) ; k>=1 ;k--){
                System.out.print("  ");

            }
            for(int j = 1 ; j<=2*i-1 ; j++){
                if(j%2==1){
                    System.out.print("* ");
                }
                else{
                    System.out.print(count+" ");
                }
            }
            count -=1;
            System.out.println();
        }
        sc.close();
    }
}

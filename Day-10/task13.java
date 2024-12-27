import java.util.Scanner;

public class task13 {

    static Integer fac(Integer n){
        if(n==1){
            return 1;
        }
        else{
            return n*fac(n-1);
        }
    }
    public static void main(String[] args) {
        Scanner sc  = new Scanner(System.in);
        System.out.println("Enter number n : ");
        int number = sc.nextInt();
        System.out.println("Enter number r : ");
        int r = sc.nextInt();
        // System.out.println(fac(number));
        int numerator = fac(number);
        int denominator = fac(number - r);

        int result = numerator/denominator ;

        System.out.println("P("+number+","+r+") : "+result);

        sc.close();
    }
}

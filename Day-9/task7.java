import java.util.Scanner ;

public class task7{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number 1 : ");
        int n1 = sc.nextInt();
        System.out.println("Enter number 2 : ");
        int n2 = sc.nextInt();

        System.out.println("Before swap n1 : "+n1+" , n2 : "+n2);
        n1 = n1+n2 ;
        n2 = n1-n2;
        n1 = n1-n2;
        System.out.println("After swap n1 : "+n1+" , n2 : "+n2);
        sc.close();
    }
}
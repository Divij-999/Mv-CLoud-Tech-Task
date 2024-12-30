public class task17_1{
    public static void main(String[] args) {
        int n = 4;
        for(int i = 1 ; i<=n ; i++){
            for(int j = 1 ; j<=i ; j++){
                System.out.print((i*i-i+2)/2+(j-1));
            }
            System.out.println();
        }
    }
}
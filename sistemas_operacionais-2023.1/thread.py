import threading

def minha_primeira_thread():
    i = 0
    while i <= 5:
        print("só alegria!")
        i += 1

def minha_segunda_thread():
    j = 0
    while j <= 10:
        print("Advinha? Só alegria hahaha")
        j += 1

t1 = threading.Thread(target=minha_primeira_thread)
t2 = threading.Thread(target=minha_segunda_thread)

t1.start()
t2.start()

t1.join()
t2.join()

print("Threads finalizadas")
    
    

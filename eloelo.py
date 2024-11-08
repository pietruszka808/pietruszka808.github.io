from tkinter import *

def button_press(num):
    pass

def equals():
    pass

def clear():
    pass

window = Tk()
window.title("Calcurator program")
window.geometry("500x500")

equation_text = ""

equation_label = StringVar()

label = Label(window, textvariable=equation_label, font=('consolas', 20), bg="white", width=24, height=2)
label.pack()

window.mainloop()

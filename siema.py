import tkinter


playerX = "X"
playerO = "O"
curr_player = playerX
board = [[0, 0, 0],[0, 0, 0],[0, 0, 0]] 

color_blue = "#4584b6"
color_yellow = "#ffde57"
color_gray = "#343434"
color_light_gray = "#646464"

window = tkinter.Tk()
window.title("Tic Tac Toe")
window.resizable(False, False)

frame = tkinter.Frame(window)
label = tkinter.Label(frame,
                      text=curr_player+"'s turn", 
                      font=("Consolas", 20), 
                      background=color_gray,
                      foreground="white")

label.grid(row=0, column=0)

for row in range(3):
    for column in range(3):
        board[row][column] = tkinter.Button(frame, text="",)

frame.pack()

window.mainloop()
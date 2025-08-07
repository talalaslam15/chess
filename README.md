# ♟️ Chess Game

A modern, responsive chess game built with React, TypeScript, and chess.js. Features a complete chess implementation with proper rule validation, real-time gameplay, and a beautiful user interface that works across all devices.

![Chess Game Screenshot](/vitest/chess.jpg)

## 🚀 Features

### ✅ Implemented Features

#### 🎮 Complete Chess Gameplay

- **Full chess rule implementation** using chess.js library
- **Turn-based gameplay** with proper player alternation
- **Move validation** for all pieces (King, Queen, Rook, Bishop, Knight, Pawn)
- **Special moves**: Castling, En passant, Pawn promotion
- **Game state detection**: Check, Checkmate, Stalemate, Draw

#### 🎨 Modern UI/UX

- **Responsive design** that works on all screen sizes
- **Clean, professional interface** with modern styling
- **Visual move indicators**: Green dots for valid moves, red circles for captures
- **Selected piece highlighting** with intuitive click-to-move interface
- **Real-time game status** and turn indicators

#### 📱 Cross-Device Compatibility

- **Mobile-first responsive design**
- **Touch-friendly interface** for mobile devices
- **Adaptive piece sizing** that scales with screen size
- **Optimized layouts** for desktop, tablet, and mobile

#### 🔧 Advanced Features

- **Move history** with chess notation
- **Captured pieces display** for both players
- **Game reset functionality**
- **Zoom-level optimization** (pieces remain visible at all zoom levels)
- **Hot module replacement** for development

#### 🏗️ Technical Implementation

- **React 18** with TypeScript for type safety
- **chess.js** for bulletproof chess logic and validation
- **Emotion CSS** for styled components and responsive design
- **Vite** for fast development and building
- **ESLint** for code quality

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/talalaslam15/chess.git
cd chess

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The game will be available at `http://localhost:5173/chess/`

## 🎯 How to Play

1. **Start a Game**: The game begins with White to move
2. **Select a Piece**: Click on any piece of your color
3. **See Valid Moves**: Green dots show valid empty squares, red circles show capture moves
4. **Make a Move**: Click on a highlighted square to move your piece
5. **Game Progress**: The interface shows whose turn it is and any special game states (check, checkmate, etc.)

### Game Controls

- **Click to select/move pieces**
- **New Game button** to reset the board
- **Move history panel** to track all moves
- **Captured pieces display** to see taken pieces

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ChessBoard.tsx   # Main game board component
│   ├── CapturedPieces.tsx  # Captured pieces display
│   └── MoveHistory.tsx  # Move history panel
├── hooks/
│   └── useChessGame.ts  # Main game logic hook
├── types/
│   └── chess.ts         # TypeScript type definitions
├── chess-pieces.tsx     # Chess piece components
├── styles.ts           # Shared styles
└── main.tsx            # App entry point

public/
├── *.png              # White piece images
└── black/             # Black piece images
    └── *.png
```

## 🔮 Pending Features

### 🌐 Multiplayer Implementation

- [ ] **Real-time matchmaking** with random players
- [ ] **WebSocket integration** (Socket.io) for live move synchronization
- [ ] **Game rooms** and lobby system
- [ ] **Player profiles** and authentication
- [ ] **Spectator mode** for watching games

### 🎮 Enhanced Gameplay

- [ ] **Drag and drop** piece movement (alternative to click-to-move)
- [ ] **Move animations** and smooth transitions
- [ ] **Sound effects** for moves, captures, check, etc.
- [ ] **Game timer/clock** with time controls
- [ ] **Undo/Redo moves** functionality

### 🏆 Advanced Features

- [ ] **Rating system** (ELO) for players
- [ ] **Game analysis** and move suggestions
- [ ] **Save/Load games** with PGN format support
- [ ] **Tournament system** and brackets
- [ ] **Chat system** for players

### 🎨 UI Enhancements

- [ ] **Multiple board themes** and piece sets
- [ ] **Dark/Light mode** toggle
- [ ] **Accessibility improvements** (screen reader support, keyboard navigation)
- [ ] **Mobile app** version (React Native)

## 🧪 Development

### Available Scripts

```bash
npm start       # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run preview # Preview production build
```

### Technology Stack

- **Frontend**: React 18, TypeScript, Emotion CSS
- **Chess Logic**: chess.js
- **Build Tool**: Vite
- **Styling**: Emotion CSS with responsive design
- **Linting**: ESLint with TypeScript rules

### Development Guidelines

- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks with custom game logic
- **Performance**: Optimized re-renders and memoization

## 🚀 Deployment

The project is configured for GitHub Pages deployment:

```bash
npm run build
# Deploy the dist/ folder to your hosting platform
```

The app is also ready for deployment on:

- Vercel
- Netlify
- Railway
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Priorities

1. **Multiplayer backend** (Express + Socket.io)
2. **Drag and drop** interface
3. **Real-time synchronization**
4. **User authentication** and profiles

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **chess.js** - For providing robust chess game logic
- **React Team** - For the amazing React framework
- **Vite Team** - For the fast development experience
- **Chess piece images** - From the open-source chess community

## 📞 Contact

- **GitHub**: [@talalaslam15](https://github.com/talalaslam15)
- **Project Link**: [https://github.com/talalaslam15/chess](https://github.com/talalaslam15/chess)

---

Built with ❤️ by [Talal Aslam](https://github.com/talalaslam15)

#!/bin/bash

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print formatted message
print_step() {
    echo -e "\n${GREEN}${BOLD}Step: $1${NC}"
}

print_info() {
    echo -e "${BOLD}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${BOLD}$1${NC}"
}

print_error() {
    echo -e "${RED}${BOLD}$1${NC}"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is for macOS only"
    exit 1
fi

# Check if running in Cursor
if [[ ! "$TERM_PROGRAM" == "vscode" ]] && [[ ! "$TERM_PROGRAM" == "cursor" ]]; then
    print_warning "⚠️  This script is designed to run in Cursor's terminal"
    print_warning "Please run this script from within Cursor for the best experience"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install Homebrew if not present
install_homebrew() {
    print_step "Installing Homebrew (if not installed)"
    if ! command -v brew &> /dev/null; then
        print_info "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Add Homebrew to PATH for Apple Silicon Macs
        if [[ $(uname -m) == "arm64" ]]; then
            print_info "Configuring Homebrew for Apple Silicon..."
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
            eval "$(/opt/homebrew/bin/brew shellenv)"
        fi
    else
        print_info "✓ Homebrew is already installed"
    fi
}

# Install Node.js using Homebrew
install_node() {
    print_step "Installing Node.js"
    if ! command -v node &> /dev/null; then
        print_info "Installing Node.js..."
        brew install node
    else
        print_info "✓ Node.js is already installed: $(node -v)"
    fi
}

# Install Git using Homebrew
install_git() {
    print_step "Installing Git"
    if ! command -v git &> /dev/null; then
        print_info "Installing Git..."
        brew install git
    else
        print_info "✓ Git is already installed: $(git --version)"
    fi
}

# Clone the repository
clone_repo() {
    print_step "Setting up the project"
    
    # Define the repository URL
    REPO_URL="https://github.com/your-org/design-system.git"
    
    # Create a development directory if it doesn't exist
    DEV_DIR="$HOME/Development"
    mkdir -p "$DEV_DIR"
    cd "$DEV_DIR"
    
    if [ ! -d "design-system" ]; then
        print_info "Cloning the repository..."
        git clone $REPO_URL
        cd design-system
    else
        print_info "Repository already exists, updating..."
        cd design-system
        git pull
    fi
}

# Install project dependencies
install_dependencies() {
    print_step "Installing project dependencies"
    print_info "Running npm install..."
    npm install
}

# Main setup process
main() {
    clear
    print_info "🎨 Design System Setup"
    print_info "====================="
    echo
    
    # Run installation steps
    install_homebrew
    install_node
    install_git
    clone_repo
    install_dependencies
    
    # Setup complete
    echo
    print_info "🎉 Setup Complete!"
    print_info "=================="
    echo
    print_info "To start development:"
    echo "  cd ~/Development/design-system"
    echo "  npm run dev"
    echo
    print_info "This will start:"
    echo "  - Main app at: http://localhost:3000"
    echo "  - Storybook at: http://localhost:6006"
    echo
    print_warning "Note: The first build might take a few minutes"
    
    # Offer to start the development environment
    echo
    read -p "Would you like to start the development environment now? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run dev
    fi
}

# Run the setup
main 
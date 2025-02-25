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

# Check if we're in the repository directory
if [[ ! -d ".git" ]]; then
    print_error "Please run this script from the root of the design-system repository"
    print_info "You can clone it with:"
    echo "git clone https://github.com/your-org/design-system.git"
    echo "cd design-system"
    echo "./setup.sh"
    exit 1
fi

# Install Node.js using nvm (Node Version Manager)
install_node() {
    print_step "Checking Node.js installation"
    
    # Check if Node.js is already installed and meets version requirements
    if command -v node &> /dev/null; then
        local current_version=$(node -v | cut -d 'v' -f2)
        if [[ "$(printf '%s\n' "22.0.0" "$current_version" | sort -V | head -n1)" = "22.0.0" ]]; then
            print_info "✓ Node.js $(node -v) is already installed and meets version requirements"
            print_info "  - npm version: $(npm -v)"
            if command -v nvm &> /dev/null; then
                print_info "  - nvm current: $(nvm current)"
            fi
            return 0
        else
            print_warning "! Node.js $(node -v) is installed but version 22 or higher is required"
        fi
    fi
    
    # First try to install using nvm
    if ! command -v nvm &> /dev/null; then
        print_info "Installing nvm (Node Version Manager)..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
        
        # Source nvm without restarting the shell
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        
        if ! command -v nvm &> /dev/null; then
            print_error "Failed to install nvm"
            print_warning "Installing Homebrew and Node.js as fallback..."
            install_homebrew_if_needed
            brew install node
        fi
    fi
    
    # If nvm is available, use it to install Node.js
    if command -v nvm &> /dev/null; then
        print_info "Installing Node.js v22 using nvm..."
        nvm install 22
        
        # Verify installations
        NODE_VERSION=$(node -v)
        NPM_VERSION=$(npm -v)
        NVM_CURRENT=$(nvm current)
        
        print_info "✓ Node.js installation complete:"
        print_info "  - Node version: $NODE_VERSION"
        print_info "  - npm version: $NPM_VERSION"
        print_info "  - nvm current: $NVM_CURRENT"
    else
        # Verify Homebrew fallback installation
        if command -v node &> /dev/null; then
            print_info "✓ Node.js is installed via Homebrew fallback: $(node -v)"
        else
            print_error "Failed to install Node.js through any method"
            exit 1
        fi
    fi
}

# Install Homebrew only if needed as fallback
install_homebrew_if_needed() {
    if ! command -v brew &> /dev/null; then
        print_step "Installing Homebrew as fallback"
        print_info "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        
        # Add Homebrew to PATH for Apple Silicon Macs
        if [[ $(uname -m) == "arm64" ]]; then
            print_info "Configuring Homebrew for Apple Silicon..."
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
            eval "$(/opt/homebrew/bin/brew shellenv)"
        fi
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
    install_node
    install_dependencies
    
    # Setup complete
    echo
    print_info "🎉 Setup Complete!"
    print_info "=================="
    echo
    
    # Offer to start the development environment
    echo
    read -p "Would you like to start the development environment now? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run dev
    else
        print_info "To start development later:"
        echo "  npm run dev"
        echo
        print_info "This will start the app in your browser:"
        echo "  -  CLICK HERE TO OPEN APP IN BROWSER: http://localhost:3000"
        echo
        print_warning "Note: The first build might take a few minutes"
    fi
}

# Run the setup
main 